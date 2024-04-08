import Image from "next/image";

/**
 * UI from https://flowbite.com/docs/components/forms/
 */

export default function Home() {
  return (
    <div className="m-10">
      <h1 className="mb-4 text-2xl font-bold text-center text-gray-900 dark:text-white">
        Add Expense
      </h1>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {/* Add Amount for number only input */}
        <div className="mb-5">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        {/* Generate Input for category fields */}
        <div className="mb-5">
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="others">Others</option>
          </select>
        </div>
        {/* Generate Select Input Fields for Accounts */}
        <div className="mb-5">
          <label
            htmlFor="account"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Account
          </label>
          <select
            id="account"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div className="mb-5">
          <label
            htmlFor="memo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Memo
          </label>
          <input
            type="text"
            id="memo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
    // <div classNameName="flex justify-center items-center h-screen">
    //   <div classNameName="w-96 space-y-4">
    //     <div classNameName="flex justify-between">
    //       <label htmlhtmlFor="date">Date</label>
    //       <input
    //         id="date"
    //         type="date"
    //         classNameName="border border-gray-300 p-2 rounded-md"
    //       />
    //     </div>
    //     <div classNameName="flex justify-between">
    //       <label htmlhtmlFor="amount">Amount</label>
    //       <input
    //         id="amount"
    //         type="number"
    //         classNameName="border border-gray-300 p-2 rounded-md"
    //       />
    //     </div>
    //     <div classNameName="flex justify-between">
    //       <label htmlhtmlFor="description">Description</label>
    //       <input
    //         id="description"
    //         type="text"
    //         classNameName="border border-gray-300 p-2 rounded-md"
    //       />
    //     </div>
    //     <button classNameName="bg-blue-500 text-white p-2 rounded-md">
    //       Submit
    //     </button>
    //   </div>
    // </div>
  );
}
