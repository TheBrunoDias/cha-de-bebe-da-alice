import { FormEvent, useEffect, useState } from "react";
import { DepoimentProps, depoimentService } from "../../services/depoimentService";
import { useQueryClient } from "react-query";
import Notiflix from "notiflix";



export function DepoimentForm() {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const currentTarget = event.currentTarget;
    event.preventDefault();

    setIsLoading(true);

    const data = Object.fromEntries(new FormData(event.currentTarget)) as DepoimentProps;

    await depoimentService.createDepoiment(data);

    queryClient.invalidateQueries({ queryKey: ['depoiments'] });

    setIsLoading(false);
    currentTarget.reset();
  }

  useEffect(() => {
    if (isLoading) {
      Notiflix.Block.circle('.depoiments-form');
    } else {
      Notiflix.Block.remove('.depoiments-form');
    }
  }, [isLoading])


  return (
    <form onSubmit={handleSubmit} className="w-full depoiments-form">
      <h2 className="font-semibold text-fuchsia-500 text-lg mb-5">Deixe uma mensagem para o bebê e a família!</h2>
      <div className="space-y-2">
        <input type="text" name="name" id="name" placeholder="Seu Nome" required className="w-full h-full p-2 border border-fuchsia-200 focus:outline-none focus:border-fuchsia-500 rounded-md" />
        <textarea placeholder="Sua Mensagem" name="depoiment" id="depoiment" rows={5} className="w-full h-full p-2 border border-fuchsia-200 focus:outline-none focus:border-fuchsia-500 rounded-md"></textarea>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-fuchsia-400 px-4 py-2 text-sm font-medium text-fuchsia-950 hover:bg-fuchsia-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}