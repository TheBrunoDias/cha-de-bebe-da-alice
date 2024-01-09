

export function Footer() {

  return (
    <>
      <footer className="flex justify-between items-center flex-wrap gap-2 mt-8 bg-white backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg rounded-2xl p-4 text-fuchsia-400 font-semibold text-sm">
        <p>Feito com muito amor pelo tio mais legal do mundo!</p>
        <div className="flex justify-center items-center gap-2">
          <a target="_blank" rel="noopener noreferrer" className="underline" href="https://www.linkedin.com/in/brunosdias1997">Bruno Dias.</a>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}