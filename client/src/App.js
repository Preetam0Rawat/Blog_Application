import './App.css';
import {Routes, Route} from 'react-router-dom'
import Signin from './pages/Signin';
import Home from './pages/Home';
import Signup from './pages/Signup';
import CreateForm from './pages/CreateForm';
import EditForm from './pages/EditForm';
import { BlogProvider } from './components/BlogContext';
import ViewBlog from './pages/ViewBlog';

function App() {
  return (
    <div className="App">
      <BlogProvider>
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/signin' element = {<Signin/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/blog/search' element = {<Home/>}/>
        <Route path = '/createForm' element = {<CreateForm/>}/>
        <Route path = '/editForm' element = {<EditForm/>}/>
        <Route path = '/viewBlog' element = {<ViewBlog/>}/>
      </Routes>
      </BlogProvider>
    </div>
  );
}

export default App;
