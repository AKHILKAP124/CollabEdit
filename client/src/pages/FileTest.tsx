import FileExplorer from '@/components/FileStructure'
import React from 'react'

const FileTest = () => {
  return (
      <div>
          File Test
          <div className='grid grid-cols-3'>
              <div className='w-full h-screen bg-gray-900'>
                  <FileExplorer />
              </div>
              <div className='w-full h-screen bg-red-300'>3</div>
              <div className='w-full h-screen bg-green-300'>1</div>
          </div>
    </div>
  )
}

export default FileTest