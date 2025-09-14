import TagsMenu from '../TagsMenu/TagsMenu';
import css from './Header.module.css'
import Link from 'next/link'

const Header = () => {
  return <header className={css.header}>
  <Link href="/" aria-label="Home" className={css.headerLink}>
    NoteHub
  </Link>
  <nav aria-label="Main Navigation">
    <ul className={css.navigation}>
      <li className={css.navigationItem}>
        <Link href="/" className={css.navigationLink}>Home</Link>
      </li>
      <li>
        <TagsMenu />
      </li>
    </ul>
  </nav>
</header>

}

export default Header;