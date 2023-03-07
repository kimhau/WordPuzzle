<div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
   <div class="flex flex-grow flex-col gap-3">
      <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
         <div class="markdown prose w-full break-words dark:prose-invert light">
            <h1>React Native Word Puzzle App</h1>
            <p>This is a mobile app built with React Native that generates random word puzzles using fakejs library. It coded in typescript and showcases how to use React Navigation, Redux Toolkit for state management.</p>
            <h2>Getting Started</h2>
            <h3>Installing</h3>
            <p>To get started, clone this repository and install the dependencies:</p>
            <pre><code>git clone https://github.com/kimhau/WordPuzzle.git
cd react-native-word-puzzle
npm install
</code></pre>
            <h3>Running the app</h3>
            <p>To start the app on android devices or emulator, run the following command:</p>
            <pre><code>npm run android</span>
</code></pre>
<p>To start the app on ios devices or simulator, run the following command:</p>
            <pre><code>npm run ios</span>
</code></pre>
            <h2>Tech Stack</h2>
            <p>This app was built using the following technologies:</p>
            <ul>
               <li><a href="https://reactnative.dev/" target="_new">React Native</a></li>
               <li><a href="https://reactnavigation.org/" target="_new">React Navigation</a></li>
               <li><a href="https://redux-toolkit.js.org/" target="_new">Redux Toolkit</a></li>
               <li><a href="https://www.typescriptlang.org/" target="_new">TypeScript</a></li>
            </ul>
            <h2>Features</h2>
            <ul>
               <li>Generate a new word puzzle with a random word and a list of jumbled letters</li>
               <li>Unscramble the letters to form the original word</li>
               <li>Get feedback on whether the word is correct or incorrect</li>
               <li>Keep track of your score as you solve more puzzles</li>
            </ul>
            <h2>Code Structure</h2>
            <p>The app is organized into several components and screens:</p>
            <ul>
               <li><code>App.tsx</code>: the root component that sets up Redux and React Navigation</li>
               <li><code>components/</code>: reusable UI components used throughout the app</li>
               <li><code>screens/</code>: top-level screens that are displayed in the app</li>
               <li><code>store/</code>: Redux store configuration and slice definitions</li>
            </ul>
            <h2>Redux State Management</h2>
            <p>This app uses Redux Toolkit for state management. The Redux store is configured in <code>store/index.ts</code>, and the app's state is split into several slices:</p>
            <ul>
               <li><code>user</code>: tracks the user's score and user name</li>
            </ul>
            <h2>Testing</h2>
            <p>This app includes Jest unit tests for some of the screens. To run the tests and view coverage report, run the following command:</p>
            <pre><code>npm run test:report</code></pre>
            <h2>Acknowledgments</h2>
            <p>This app was built using the <a href="https://thecodingmachine.github.io/react-native-boilerplate/" target="_new">Coding Machine</a> boilerplate. Special thanks to the creators of the following libraries used in this app:</p>
            <ul>
               <li><a href="https://reactnative.dev/" target="_new">React Native</a></li>
               <li><a href="https://reactnavigation.org/" target="_new">React Navigation</a></li>
               <li><a href="https://redux-toolkit.js.org/" target="_new">Redux Toolkit</a></li>
               <li><a href="https://www.typescriptlang.org/" target="_new">TypeScript</a></li>
               <li><a href="https://github.com/faker-js/faker" target="_new">fakejs</a></li>
            </ul>
         </div>
      </div>
   </div>
</div>
