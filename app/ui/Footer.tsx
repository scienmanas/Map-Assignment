import Link from "next/link";

export function Footer(): JSX.Element {
  return (
    <footer className="w-full h-fit flex items-center justify-center bg-neutral-100">
      <section className="footer w-full flex flex-col items-center justify-center h-fit max-w-screen-xl p-4 border-t border-neutral-400">
        <div>
          Made by{" "}
          <span className="font-bold text-blue-500">
            <Link className="hover:underline" href={"https://scienmanas.xyz"}>
              Manas
            </Link>
          </span>
          ✨
        </div>
      </section>
    </footer>
  );
}
