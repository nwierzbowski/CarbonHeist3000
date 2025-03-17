interface Props {
  children?: React.ReactNode; // Optional children prop
}

export default function Header({ children }: Props) {
  return <h1 className="text-3xl font-bold text-green-600 mb-4">{children}</h1>;
}
