import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { ThemeProvider } from './contexts/themeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <PipelineToolbar />
        <PipelineUI />
      </div>
    </ThemeProvider>
  );
}

export default App;
