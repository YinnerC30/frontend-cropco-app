import { useEffect, useRef } from 'react';
interface Props {
  title: string;
  prevailOnUnmount?: boolean;
}

function useDocumentTitle({ title, prevailOnUnmount = false }: Props) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `Cropco | ${title}`;
  }, [title]); // El efecto se ejecuta cada vez que 'title' cambia

  useEffect(
    () => () => {
      if (!prevailOnUnmount) {
        document.title = defaultTitle.current;
      }
    },
    []
  ); // Este efecto de limpieza solo se ejecuta una vez al desmontar
}

export default useDocumentTitle;
