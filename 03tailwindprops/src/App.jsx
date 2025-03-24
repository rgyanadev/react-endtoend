import './App.css';
import Card from './components/Card';

function App() {
  const propsVal = {
    username: 'gyana',
    age: 21
  }

  return (
    <>
      <div className='font-bold bg-orange-200 rounded text-green-400 p-4 mb-4'>
        Tailwind CSS
      </div>

      <Card title="Anya olsen" subTitle="#34th porn star" />
      <Card title="Manual javed" />
    </>
  )
}

export default App;
