import { useEffect, useState } from "react";
import { api } from "../services/api";

import { Button } from './Button';

interface selectedGenreIdProps{
  selectedGenreId : number; 
  setSelectedGenreId: Function;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props: selectedGenreIdProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]); 

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return(
  <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => props.setSelectedGenreId(genre.id)}
          selected={props.selectedGenreId === genre.id}
        />
      ))}
    </div>
  </nav>);
  
}