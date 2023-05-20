import './styles/global.css';

export function App() {
  return (
    <main>
      <form>
        <div>
          <label>E-mail</label>
          <input 
            type="email"
            name="email"
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password"
            name="password"
          />
        </div>

        <button 
          type="submit"
        >
          Submit
        </button>     
      </form>
    </main>
  )
}