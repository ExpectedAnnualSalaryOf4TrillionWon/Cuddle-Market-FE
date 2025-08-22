import { create } from 'zustand';

type Message = {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'opponent';
};

type ChatSocketState = {
  socket: WebSocket | null;
  messages: Record<string, Message[]>; // roomId -> 메시지 배열
  currentRoomId: string | null;
  retryCount: number;
  connect: (url: string) => void;
  reconnect: (url: string) => void; // ✅ 새로 추가
  disconnect: () => void;
  joinRoom: (roomId: string) => void;
  sendMessage: (roomId: string, text: string) => void;
};

export const useChatSocketStore = create<ChatSocketState>((set, get) => ({
  socket: null,
  messages: {},
  currentRoomId: null,
  retryCount: 0,

  connect: (url: string) => {
    // 이미 연결되어 있다면 재연결하지 않음
    if (get().socket) return;

    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('✅ 웹소켓 연결됨');
      set({ socket: ws, retryCount: 0 }); // 연결되면 retryCount 초기화
    };

    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      const { roomId, text, time } = data;

      set(state => ({
        messages: {
          ...state.messages,
          [roomId]: [
            ...(state.messages[roomId] || []),
            { id: Date.now().toString(), text, time, sender: 'opponent' },
          ],
        },
      }));
      set({ socket: ws });
    };

    ws.onclose = () => {
      console.log('⚠️ 웹소켓 연결 종료');
      set({ socket: null });
      get().reconnect(url); // 재연결 시도
    };

    ws.onerror = err => {
      console.error('❌ 웹소켓 에러:', err);
      ws.close(); // onclose에서 재연결 처리
    };
  },

  // 재연결 로직
  reconnect: (url: string) => {
    const { retryCount } = get();
    const delay = Math.min(1000 * 2 ** retryCount, 30000); // 최대 30초 대기
    console.log(`🔄 ${delay / 1000}초 후 재연결 시도 (${retryCount + 1}회)`);

    setTimeout(() => {
      set({ retryCount: retryCount + 1 });
      get().connect(url);
    }, delay);
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      socket.close();
      set({ socket: null });
    }
  },

  joinRoom: (roomId: string) => {
    set({ currentRoomId: roomId });
    // 필요시 서버에 room join 이벤트 보내기 가능
    // get().socket?.send(JSON.stringify({ type: "join", roomId }));
  },

  sendMessage: (roomId: string, text: string) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = { roomId, text, time: new Date().toLocaleTimeString() };
      socket.send(JSON.stringify(message));

      // 내 메시지도 바로 UI에 반영
      set(state => ({
        messages: {
          ...state.messages,
          [roomId]: [
            ...(state.messages[roomId] || []),
            { id: Date.now().toString(), text, time: message.time, sender: 'me' },
          ],
        },
      }));
    }
  },
}));
