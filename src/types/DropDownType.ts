export interface DropdownProps {
  isOpen: boolean;
  // 드롭다운 활성화 여부는 boolean값을 통해 변경하게 된다.
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  //setIsOpen은 React.useState로부터 생성된 set함수로 boolean 값을 변경할 수 있는 타입이다.
  alarms?: string[];
}
