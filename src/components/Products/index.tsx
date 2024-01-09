import { useQuery } from "react-query";
import { ProductProps, productService } from "../../services/productsService";
import { OrderProps, orderOptions, productHelper } from "./helpers";
import { CaretCircleUpDown, Check, Gift } from "@phosphor-icons/react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { PixModal } from "../PixModal";

export function Products() {
  const [order, setOrder] = useState<OrderProps>(orderOptions[0]);
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data } = useQuery({
    queryKey: ['products', order],
    queryFn: async () => {
      const result = await productService.getProducts();
      return productHelper.sortProducts(result, order);
    }
  });

  function openModal(product: ProductProps) {
    setIsOpenModal(true);
    setSelectedProduct(product);
  }

  function closeModal() {
    setIsOpenModal(false);
    setSelectedProduct(null);
  }

  return (
    <>
    <div className="flex flex-col divide-y space-y-4 bg-white backdrop-filter backdrop-blur-sm bg-opacity-60 shadow-lg rounded-2xl p-4">
      <div className="flex justify-between items-center p-3 gap-3">
        <div className="flex justify-start items-center w-full gap-3">
          <Gift color="#d946ef" size={32} />
          <span className="font-bold text-lg text-fuchsia-500">Lista de Presentes</span>
        </div>

        <div className="w-full">
          <Listbox value={order} onChange={setOrder}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{order.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <CaretCircleUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {orderOptions.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-fuchsia-100 text-fuchsia-500' : 'text-gray-900'
                        }`
                      }
                      value={option}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                              }`}
                          >
                            {option.label}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-fuchsia-300">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>

      {data?.map(item => (
        <div key={item.id} className="flex justify-start items-center gap-3 w-full p-3">
          <img className="w-[100px] h-[100px] object-contain" src={item.image} alt={item.name} />
          <div className="flex flex-col">
            <strong className="font-bold text-lg text-fuchsia-500">{item.name}</strong>
            <span className="text-sm">{productHelper.formatPrice(item.price)}</span>
            <button onClick={() => openModal(item)} className="mt-2 border bg-fuchsia-300 hover:bg-fuchsia-500 text-fuchsia-900 px-2 py-1 rounded duration-150 max-w-28 font-semibold">Fazer o pix</button>
          </div>
        </div>
      ))}
    </div>

    {isOpenModal && selectedProduct && <PixModal closeModal={closeModal} isOpen={isOpenModal} product={selectedProduct} />}
    </>
  );
}