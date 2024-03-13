import { Splide, SplideSlide } from '@splidejs/react-splide';
import Slide from '../Slide/Slide';
import Footer from '../Footer/Footer';

import './Instruction.scss'
import '@splidejs/react-splide/css';

import Img_1 from '../../img/Step_1.png'
import Img_2 from '../../img/Step_2.png'
import Img_3 from '../../img/Step_3.png'
import Img_4 from '../../img/Step_4.png'
import Img_5 from '../../img/Step_5.png'
import Img_6 from '../../img/Step_6.png'
import Img_7 from '../../img/Step_7.png'

const Instruction = () => {
    const splideOptions = {
        pagination: false,
      };

  return (
    <div className='Instruction'>
        <h1 className='Instruction__title'>Instrukcja obsługi aplikacji</h1>
        <Splide options={splideOptions} aria-label="Instruction slides">
            <SplideSlide>
                <Slide 
                    img={Img_1}
                    title={'1. Kliknij w przycisk z napisem "Użyj wykres". '}
                />
            </SplideSlide>

            <SplideSlide>
                <Slide 
                    img={Img_2}
                    title={'2. Wgraj plik xlsx na jeden z dwóch możliwych sposobów - przeciągnij lub wybierz po kliknięciu w zielony przycisk "Prześlij plik". Następnie kliknij w przycisk z napisem "Rysuj wykres". '}
                />
            </SplideSlide>

            <SplideSlide>
                <Slide 
                    img={Img_3}
                    title={'3. Pamiętaj, że wgrywany plik musi być zgodny ze schematem z powyższego obrazka.'}
                />
            </SplideSlide>

            <SplideSlide>
                <Slide 
                    img={Img_4}
                    title={'4. Dostosuj wykres pod swoje wymagania.'}
                />
            </SplideSlide>

            <SplideSlide>
                <Slide 
                    img={Img_5}
                    title={'5. Zmień wyświetlany zakres, ustawienie temperatury lub czasu i dodaj adnotacje według własnej potrzeby.'}
                />
            </SplideSlide>

            <SplideSlide>
                <Slide 
                    img={Img_6}
                    title={'6. Pamiętaj, że możesz zobaczyć wszystkie adnotacje znajdujące się na wykresie klikając w przycisk z napisem "Lista".'}
                />
            </SplideSlide>

            <SplideSlide>
                <Slide 
                    img={Img_7}
                    title={'7. Zapisz wykres jako obrazek w formacie PNG klikając w przycisk z napisem "Export". Zachowany obrazek weźmie pod uwagę wszystkie ustawienia i będzie się znajdował na przeźroczystym tle.'}
                />
            </SplideSlide>
        </Splide>
        <Footer />
    </div>
  );
};

export default Instruction;
