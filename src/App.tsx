import { About } from "./components/About"
import { Depoiments } from "./components/Depoiments"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Products } from "./components/Products"

function App() {
  return (
    <>
      <div className='bg-home w-full flex justify-start items-center flex-col py-7 bg-fixed bg-cover bg-no-repeat bg-center'>
        <Header />
        <div className="lg:grid grid-cols-1 lg:grid-cols-3 gap-y-5 lg:gap-10 container mx-auto mt-9 px-2">
          <div className="col-span-1 space-y-4 mb-5">
            <About />
            <Depoiments />
          </div>

          <div className="col-span-2">
            <Products />
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
