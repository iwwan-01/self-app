import './App.css';

import { QuizAssignment } from '@/components/quiz-assignment';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <>
      <ThemeProvider>
        <div className='absolute top-0 left-0'>
          <ModeToggle />
        </div>
        {/* Main Container */}
        <main className='flex justify-center items-center text-left'>
          <QuizAssignment />
        </main>
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
