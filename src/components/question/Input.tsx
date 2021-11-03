import React from "react";

// TODO: Make it dynamic

const Input = () => {
  return (
    <div>
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <div className="border-b-[6px] border-gray-300 dark:border-gray-700 focus-within:border-indigo-500 dark:focus-within:border-pink-500 rounded">
        <input
          type="text"
          name="name"
          id="name"
          className="block w-full border-0 border-transparent focus:ring-0 text-lg px-0 bg-transparent"
          placeholder="A new tool called Notion"
        />
      </div>
    </div>
  );
};

export default Input;
