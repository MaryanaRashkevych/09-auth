'use client'

import css from './TagsMenu.module.css'
import { useState } from 'react'
import Link from 'next/link';

const tags:string[] = ['Todo', "Work", "Personal", "Meeting", "Shopping"]

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);


  return (<div className={css.menuContainer}>
  <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
    Notes ▾
  </button>
    {isOpen && <ul className={css.menuList}>
      <li className={css.menuItem} key={"All"}>
        <Link href={"/notes/filter/All"} className={css.menuLink} onClick={() => setIsOpen(false)}>
          All notes
        </Link>
      </li>
       {tags.map(tag => (
            <li className={css.menuItem} key={tag}>
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setIsOpen(false)}>
                {tag}
              </Link>
            </li>))}
    </ul>}
</div>
)
}