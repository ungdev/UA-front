import Partners from '@/components/Partners';

import Slider from '@/components/landing/Slider';
import Counter from '@/components/landing/Counter';
import BoxContainer from '@/components/landing/BoxContainer';
import { VerticalDivider, Button, Title } from '@/components/UI';

const Home = () => {
  return (
    <div id="home">
      <Slider
        slides={[
          <div key={'slide-1'} style={{ backgroundColor: 'red', width: '100%', height: '100%' }}>
            Test 1
          </div>,
          <div key={'slide-2'} style={{ backgroundColor: 'green', width: '100%', height: '100%' }}>
            Test 2
          </div>,
          <div key={'slide-3'} style={{ backgroundColor: 'blue', width: '100%', height: '100%' }}>
            Test 3
          </div>,
        ]}
      />

      <div className="cta-main">
        <Title level={1}>LA PLUS GRANDE COMPÉTITION E-SPORT DU GRAND EST</Title>
        <div className="cta-main-subtitle">Prépare toi à entrer dans l’arène !</div>
        <Button primary className="connection">
          Découvrir l’événement
        </Button>
      </div>

      <BoxContainer title="Quelques chiffres">
        <Counter value={7} name="Jeux" className="flex-1" />
        <VerticalDivider />
        <Counter value={10000} name="Euros de cashprize" />
        <VerticalDivider />
        <Counter value={500} name="Participants" className="flex-1" />
      </BoxContainer>
      <Partners />
    </div>
  );
};

export default Home;
