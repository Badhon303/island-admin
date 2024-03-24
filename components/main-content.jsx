const MainContent = () => {
  return (
    <div className="h-[87vh] me-1">
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:hover:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-400">
        <div className="pe-1">
          <div className={`p-6 bg-background rounded-3xl mb-2 shadow-basic`}>
            <p className="h-[60vh] mb-2">Main Content</p>
          </div>
          <div className={`p-6 bg-background rounded-3xl mb-2 shadow-basic`}>
            <p className="h-[60vh] mb-2">Main Content</p>
          </div>
          <div className={`p-6 bg-background rounded-3xl shadow-basic`}>
            <p className="h-[60vh] mb-2">Main Content</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainContent
