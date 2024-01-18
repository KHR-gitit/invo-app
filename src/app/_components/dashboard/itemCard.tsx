"use client"
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useState} from 'react'
import { api } from '~/trpc/react'
import ShortList from './shortlist'


function ItemCard({setItem}:{setItem: React.Dispatch<React.SetStateAction<{ itemName: string; description: string; quantity: number; price: number; }>>}) {
    

const [itemDescription, setItemDescription] = useState('')
const [itemQuantity, setItemQuantity] = useState(0)
const [itemPrice, setItemPrice] = useState(0)

const itemNameInput = document.getElementById('item-name-id') as HTMLInputElement;
const itemName = itemNameInput ? itemNameInput.value : '';

    const {isLoading,data} = api.invoice.getItem.useQuery()
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [itemId, setItemId] = useState("")
  return (
    <div id="itemWrapper">        
        <div className="sm:col-span-1 mt-2.5">
        <label htmlFor="item-name-id" className="block text-sm font-semibold leading-6 text-gray-900">
            Item
        </label>
        <div className="relative mt-2.5">
            {isLoading? <input
            name="item-name-id"
            id="item-name-id"
            className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            /> : data ? <ShortList inputName='item-name-id' people={data.data} setPeopleId={setItemId}/>:""}
        </div>
        </div>
        <div className="sm:col-span-1 mt-2.5">
        <label htmlFor="description-id" className="block text-sm font-semibold leading-6 text-gray-900">
            Description
        </label>
        <div className="relative mt-2.5">
            <textarea
            name="description-id"
            id="description-id"
            rows={4}
            onChange={(e)=>(setItemDescription(e.target.value))}
            value={itemDescription}
            className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
        </div>
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-5'>
        <div className="sm:col-span-1 mt-2.5">
        <label htmlFor="quantity-id" className="block text-sm font-semibold leading-6 text-gray-900">
            Quantity
        </label>
        <div className="relative mt-2.5">
        <input
            value={itemQuantity}
            onChange={(e)=>(setItemQuantity(Number(e.target.value)))}
            type='number'
            name="quantity-id"
            id="quantity-id"
            className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            /> 
        </div>
        </div>
        <div className="sm:col-span-2 mt-2.5">
        <label htmlFor="price-id" className="block text-sm font-semibold leading-6 text-gray-900">
            Price
        </label>
        <div className="relative mt-2.5">
            <input
            value={itemPrice}
            onChange={(e)=>(setItemPrice(Number(e.target.value)))}
            type='number'
            name="price-id"
            id="price-id"
            className="block w-full rounded-md border-0 px-3.5 py-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
        </div>
        <div className="sm:col-span-2 mt-11">
          <button
            onClick={(e) => {
                e.preventDefault()
                setItem({itemName: itemName, description: itemDescription, quantity: itemQuantity, price: itemPrice})
            }}
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            add item
          </button>
        </div>
        </div>
    </div>
  )
}

export default ItemCard