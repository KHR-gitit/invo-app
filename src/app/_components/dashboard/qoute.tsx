"use client"
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useState} from 'react'
import { Switch } from '@headlessui/react'
import { api } from '~/trpc/react'
import ShortList from './shortlist'
import ItemCard from './itemCard'
import { Fragment } from 'react'
import { Menu, Transition, Dialog } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
type Item = {
  itemName: string,
  description: string,
  quantity: number,
  price: number

}



export default function QouteComp() {

    const {isLoading,data} = api.bussiness.getBusiness.useQuery()
    const {isLoading: isClientLoading, data: clientData} = api.client.getClient.useQuery()
    const {mutate} = api.invoice.createInvoice.useMutation()
  
  const [agreed, setAgreed] = useState(false)
  const [open, setOpen] = useState(true)
  const [businessId, setBusinessId] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [item, setItem] = useState<Item>({itemName: '',description: '',quantity: 0,price: 0})
  useEffect(() => {
    
    setItems([...items.filter((e)=>{return e.itemName !== ''}),item])
  }, [item])
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clientId, setClientId] = useState('')

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Qoute</h2>
      </div>
    <form
        className="mx-auto mt-16 max-w-xl sm:mt-20"
    >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

          <div className="sm:col-span-1">
          <label htmlFor="business-id" className="block text-sm font-semibold leading-6 text-gray-900">
              Business
            </label>
            <div className="relative mt-2.5">
                {isLoading? <input
                name="business-id"
                id="business-id"
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              /> : data ? <ShortList inputName='business-id' people={data.data} setPeopleId={setBusinessId}/>:""}
            </div>
          </div>
          <div className="sm:col-span-1">
          <label htmlFor="client-id" className="block text-sm font-semibold leading-6 text-gray-900">
              Client
            </label>
            <div className="relative mt-2.5">
                {isClientLoading? <input
                name="client-id"
                id="client-id"
                className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              /> : clientData ? <ShortList inputName='client-id' people={clientData.data} setPeopleId={setClientId}/>:""}
            </div>
          </div>

          <Switch.Group as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className={classNames(
                  agreed ? 'bg-indigo-600' : 'bg-gray-200',
                  'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                <span className="sr-only">address not available</span>
                <span
                  aria-hidden="true"
                  className={classNames(
                    agreed ? 'translate-x-3.5' : 'translate-x-0',
                    'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                  )}
                />
              </Switch>
            </div>
            <Switch.Label className="text-sm leading-6 text-gray-600">
              Can&apos;t find your address? type it in below
            </Switch.Label>
          </Switch.Group>
          {agreed? (<>

    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
                        Address
                      </label>
                      <div className="mt-2.5">
                      <input
                          type="text"
                          name="address"
                          id="address"
                          autoComplete="organization"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="suburb" className="block text-sm font-semibold leading-6 text-gray-900">
                        Suburb
                      </label>
                      <div className="mt-2.5">
                      <input
                          type="text"
                          name="suburb"
                          id="suburb"
                          autoComplete="organization"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">
                        State
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="state"
                          id="state"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-900">
                        Postalcode
                      </label>
                      <div className="mt-2.5">
                        <input
                          type="text"
                          name="postal-code"
                          id="postal-code"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    </>
          ): (                     
          <div className="sm:col-span-2">
          <label htmlFor="address" className="block text-sm font-semibold leading-6 text-gray-900">
            Address
          </label>
          <div className="mt-2.5">
          <input
              type="text"
              name="address"
              id="address"
              autoComplete="organization"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        )}
        </div>
        <div>
    <ul role="list" className="divide-y divide-gray-100">
      {items.map((item,index) => (
        <li key={index} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">
                  {item.itemName}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {item.description}
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-6">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{item.quantity} X ${item.price}</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  ${item.quantity * item.price} 
                </p>
            </div>
            <Menu as="div" className="relative flex-none">
              <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={(e)=>{
                          e.preventDefault()
                          console.log(item,index)
                          setOpen(true)
                          
                        }}
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-50' : '',
                          'block px-3 py-1 text-sm leading-6 text-gray-900'
                        )}
                      >
                        Delete
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </li>
      ))}
    </ul>
        </div>
<div>
<Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Panel title
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        <ItemCard setItem={setItem}/>
                        </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

</div>





        <div className="mt-10">
          <button
            onClick={(e)=>{
              e.preventDefault()
              mutate({
                businessId: businessId, clientId: clientId, items: items.map((item, index) => ({ sno: (index+1), name: item.itemName, desc: item.description, qty: item.quantity, rate: item.price })),
                quote: true,
                dueDate:new Date()
              })
              console.log({
                businessId: businessId, clientId: clientId, items: items.map((item, index) => ({ sno: (index+1), name: item.itemName, desc: item.description, qty: item.quantity, rate: item.price })),
                quote: true,
                dueDate:new Date()
              })
            }}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Genarate Qoute
          </button>
        </div>
      </form>
    </div>
  )
}
