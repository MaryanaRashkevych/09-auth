'use client';
import css from '@/app/notes/filter/[...slug]/ErrorMessage.module.css'


type Props = {
  error: Error;
};

const Error  = ({ error }: Props) => {
  return (
    <div  style={{ padding: "30px", textAlign: "center", color: "red" }}>
    
    <p className={css.text}> Could not fetch note details. {error.message}</p>
    </div>
  );
}

export default Error;

