const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } min-h-[98vh] bg-white p-5 pt-8 relative duration-300 m-2 rounded-3xl shadow-basic`}
    >
      <div className="text-black">Sidebar</div>
    </aside>
  )
}

export default Sidebar
