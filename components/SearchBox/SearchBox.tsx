// import { useState } from "react";
// import css from "./SearchBox.module.css";

// interface SearchBoxProps {
//   onSearch: (query: string) => void;
// }

// export default function SearchBox({ onSearch }: SearchBoxProps) {
//   const [inputValue, setInputValue] = useState("");

//   return (
//     <input
//       className={css.input}
//       type="text"
//       placeholder="Search notes"
//       value={inputValue}
//       onChange={(e) => {
//         setInputValue(e.target.value);
//         onSearch(e.target.value); 
//       }}
//     />
//   );
// }

import css from './SearchBox.module.css'
import type { ChangeEvent } from 'react';

interface SearchBoxProps {
    searchQuery: string;
    onUpdate: (e: ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox( { searchQuery, onUpdate }: SearchBoxProps ) {  
    return (<input
  className={css.input}
  value={searchQuery}
  type="text"
  placeholder="Search notes"
  onChange={onUpdate}
 />
)
}