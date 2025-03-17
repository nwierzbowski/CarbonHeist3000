interface Props {
  children?: React.ReactNode; // Optional children prop
}

export default function Card({ children }: Props) {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-md shadow hover:shadow-lg transition">
      {children}
    </div>
  );
}
