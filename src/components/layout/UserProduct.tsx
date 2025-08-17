import { GrView } from 'react-icons/gr';

const ProductState = {
  Selling: 'selling',
  Reserved: 'reserved',
  Sold: 'sold',
} as const;
type ProductState = (typeof ProductState)[keyof typeof ProductState];

/** 상태 → 라벨/스타일 (Tailwind v4 변수 기반) */
const stateLabelMap: Record<ProductState, string> = {
  [ProductState.Selling]: '판매중',
  [ProductState.Reserved]: '예약중',
  [ProductState.Sold]: '판매완료',
};
const stateStyleMap: Record<ProductState, string> = {
  [ProductState.Selling]: 'bg-sale border-sale',
  [ProductState.Reserved]: 'bg-reserved border-reserved',
  [ProductState.Sold]: 'bg-complete border-complete',
};

type Props = {
  image: string;
  title: string;
  price: number;
  state: ProductState;
  view: number;
};

const UserProduct = ({ image, title, price, state, view }: Props) => {
  return (
    <li className="flex items-start gap-lg cursor-pointer rounded-lg p-lg border border-border bg-bg transition-shadow hover:shadow-sm">
      <div className="w-16 h-16 rounded-full overflow-hidden bg-light">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <h3 className="bodySmall text-text-primary">{title}</h3>
        <p className="heading5 text-text-primary font-bold">{price.toLocaleString()}원</p>

        <div className="flex items-center gap-xs caption text-text-secondary">
          <GrView />
          <span>조회 {view}</span>
        </div>
      </div>

      <p
        className={`flex items-center justify-center rounded-md px-3 py-1 border ${stateStyleMap[state]} text-bg text-xs font-medium whitespace-nowrap min-w-[70px]`}
      >
        {stateLabelMap[state]}
      </p>
    </li>
  );
};

export default UserProduct;
