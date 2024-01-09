import { Heart } from "@phosphor-icons/react";



export function About() {
  return (
    <div className="bg-white backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg rounded-2xl p-4">
      <>
        <p>
          Oiie!
        </p>
        <br />
        <ul className="list-disc list-inside">
          <li>
            Este site será o chá de bebê online da Alice  por conta da distância entre os familiares e amigos.
          </li>
          <li>
            Agradecemos desde já o carinho recebido por todos vocês.
          </li>
          <li>
            Estamos muito felizes com a chegada da pequena Alice e espero poder compartilhar com vocês este momento tão especial até o nascimento dela.
          </li>
          <li className="list-none flex justify-start items-center gap-2 mt-4">
            <Heart weight="fill" />
            Com amor, Suellen e Matheus.
          </li>
        </ul>


      </>
    </div>
  )
}