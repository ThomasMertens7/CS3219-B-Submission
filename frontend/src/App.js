import './App.css';
import ApiCommunication from './api-communication';
import ServerlessCommunication from './serverless-communication';

function App() {
  return (
    <div>
      <ApiCommunication />
      <hr class="new1"/>
      <ServerlessCommunication />
    </div>
  );
}

export default App;
