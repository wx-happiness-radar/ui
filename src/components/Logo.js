import Image from "next/image";
export default function Logo() {
  const source = "logo.svg";
  return (
    <>
      <Image src={source} width={200} height={200} alt="The Xero Logo" />
    </>
  );
}
