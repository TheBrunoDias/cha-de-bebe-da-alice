import { useQuery } from "react-query";
import { depoimentService } from "../../services/depoimentService";
import { format } from "date-fns";
import { useEffect } from "react";
import Notiflix from "notiflix";
import { DepoimentForm } from "./Form";



export function Depoiments() {
  const { data, isLoading } = useQuery({
    queryKey: ['depoiments'],
    queryFn: depoimentService.getDepoiments,
  });

  useEffect(() => {
    if (isLoading) {
      Notiflix.Block.circle('.depoiments-container');
    } else {
      Notiflix.Block.remove('.depoiments-container');
    }
  }, [isLoading])

  return (
    <>
      <div className="bg-white backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg rounded-2xl p-4 max-h-[50vh] overflow-auto h-full depoiments-container">
        <h2 className="font-semibold text-fuchsia-500 text-lg mb-3">Mural de mensagens</h2>
        <div className="">
          {data?.length === 0 && <p>Nenhuma mensagem encontrada.</p>}
          {data?.map(item => (
            <div key={item.id} className="py-4 border-b border-gray-400/50">
              <p className="text-gray-600 mb-2">{item.depoiment}</p>

              <div className="text-gray-700 text-sm font-semibold">
                {item.name} - {format(item.createdAt, 'hh:mm dd/MM/yyyy')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg rounded-2xl p-4">
            <DepoimentForm/>
      </div>
    </>
  )

}