import { use, useState } from 'react';

export default function DropdownButton({options}) {
  const [isOpen, setIsOpen] = useState(false);
  const [btnText, setBtnText] = useState(options[0])

  const handleSelect = (option) => {
    console.log(`You selected: ${option}`);
    setBtnText(option)
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {btnText} ▾
      </button>

      {isOpen && (
        <div className="absolute left-2 mt-2 w-40 bg-black border rounded shadow-md z-50">
        
          {options.map((option, index)=>(
         <button
            onClick={() => handleSelect(option)}
            className="block border-b-1 w-full text-left px-4 py-2 hover:bg-gray-100 hover:text-black text-white"
          >
            {option}
          </button>
          ))}


        </div>
      )}
    </div>
  );
}

/* 


*/