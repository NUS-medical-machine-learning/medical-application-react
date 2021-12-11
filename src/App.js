import NavBar from './components/navbar';
import SubjectInfo from './components/subjectInfoBar';
import InfoConsoles from './components/infoConsoles';
import SignInScreen from './components/signIn';

function App() {
  return (
    <div>
      <SignInScreen />

      <NavBar />

      <SubjectInfo />

      <InfoConsoles />
    </div>
  );
}

export default App;
