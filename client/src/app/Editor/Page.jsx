import React from 'react'
// import EditorPanel from './_components/EditorPanel'
// import OutputPanel from './_components/OutputPanel'
import Header from './components/Header'

const Editor = () => {
  return (
    <div className="font-sans antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100">
      <div className="max-w-[1800px] mx-auto py-4 px-18">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* <EditorPanel />
          <OutputPanel /> */}
        </div>
      </div>
    </div>
  );
}

export default Editor