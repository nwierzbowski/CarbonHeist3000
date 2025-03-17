interface Props {
  children?: React.ReactNode; // Optional children prop
}

export default function Title({ children }: Props) {
  return (
    <h2 className="text-lg font-semibold text-green-700 mb-2">{children}</h2>
  );
}
