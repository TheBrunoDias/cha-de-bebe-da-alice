import { Heart } from "@phosphor-icons/react"

export function Header() {

  return (
    <header className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-10 items-center w-full container mx-auto px-2">
      <div className="flex justify-center items-center w-full">
      <img src="/images/baby.jpg" alt="baby" className="rounded-full col-span-1 w-60 h-60 object-cover object-center border-[8px] border-white" />
      </div>

      <div className="flex justify-start items-center lg:items-start flex-col gap-2 col-span-2">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-2xl font-bold">Chá de bebê da Alice</h1>
          <Heart weight="fill" className="text-red-500 text-2xl" />
        </div>

        <div className="flex justify-start items-center lg:items-start flex-col">
          <span className="text-sm">Previsão de Nascimento: </span>
          <p className="text-xl font-semibold">20/04/2024</p>
        </div>
      </div>

    </header>
  )
}