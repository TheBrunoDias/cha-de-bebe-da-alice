import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import { ProductProps, productService } from "../../services/productsService";
import { QRCodeSVG } from 'qrcode.react';
import { productHelper } from "../Products/helpers";
import { X } from "@phosphor-icons/react";
import Notiflix from "notiflix";

type PixModalProps = {
  product: ProductProps;
  isOpen: boolean;
  closeModal: () => void;
}

export function PixModal({ product, isOpen, closeModal }: PixModalProps) {

  const [qrCode, setQrCode] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const { name } = Object.fromEntries(new FormData(event.currentTarget));

    const result = productService.getProductQRCode(product, name.toString());

    setQrCode(result);
  }

  async function handleCopyCode(code: string) {
    await navigator.clipboard.writeText(code);

    Notiflix.Notify.success('Copiado para Área de Transferência');
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-fuchsia-700"
                  >
                    {product.name} - {productHelper.formatPrice(product.price)}
                  </Dialog.Title>
                  <button onClick={closeModal} title="Fechar">
                    <X size={18} className="text-fuchsia-700 cursor-pointer" />
                  </button>
                </div>

                <div className="mt-4">
                  {!qrCode &&
                    <form onSubmit={handleSubmit} className="flex justify-start items-stretch w-full my-2 gap-2">
                      <input type="text" name="name" id="name" placeholder="Seu Nome" required className="w-full h-full p-2 border border-fuchsia-200 focus:outline-none focus:border-fuchsia-500 rounded-md" />
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-fuchsia-100 px-4 py-2 text-sm font-medium text-fuchsia-900 hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2"
                      >
                        Continuar
                      </button>
                    </form>
                  }

                  {qrCode &&
                    <div className="flex justify-center items-center flex-col gap-2">
                      <QRCodeSVG value={qrCode} className="max-w-[400px] w-full" />
                      <div className="flex justify-center items-center flex-col">
                        <span>Suellen Sousa Dias</span>
                        <span>{productHelper.formatPrice(product.price)}</span>
                      </div>

                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-fuchsia-100 px-4 py-2 text-sm font-medium text-fuchsia-900 hover:bg-fuchsia-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2"
                        onClick={() => handleCopyCode(qrCode)}
                      >
                        Copiar QR Code
                      </button>
                    </div>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

} 