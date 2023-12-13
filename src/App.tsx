import React, {useState} from 'react';
import axios from 'axios';


function App() {
    const [ein, setEin] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<string | null>(null);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        setSummary(null);

        try {
            const response = await axios.post('http://127.0.0.1:5000/search', {ein});
            setSummary(response.data.summary);
        } catch (error: any) {
            setError(error.response?.data?.error || 'An error occurred while fetching data.');
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="h-screen flex items-center flex-col justify-center space-y-4">
            <h1 className="text-3xl font-bold mb-4">
                Charity Information Utilizer
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center">
                <input
                    type="text"
                    value={ein}
                    onChange={(e) => setEin(e.target.value)}
                    placeholder="Enter EIN number"
                    className="border p-2 w-full mb-2"/>
                <button type="submit" disabled={isLoading}
                        className={`bg-indigo-500 text-white p-2 rounded-md w-full ${isLoading ? 'bg-indigo-300' : 'bg-indigo-500'}`}>
                    {isLoading ? 'Loading...' : 'Search'}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            {summary && (
                <div className="mt-5 p-4 border rounded-md bg-gray-100 w-full max-w-3xl">
                    <h2 className="text-2xl font-semibold mb-3">Charity Summary:</h2>
                    <ul className="list-disc space-y-2 pl-5">
                        {summary.split('\n').map((line, index) => (
                            <li key={index} className="text-base">{line}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
