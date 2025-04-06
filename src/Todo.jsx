import React, { useState, useEffect } from "react";

function Todo() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "React o'rganish", completed: false },
    { id: 2, title: "Tailwind CSS ni sozlash", completed: true },
    { id: 3, title: "UI ni chiroyli qilish", completed: false },
  ]);
  const [reversed, setReversed] = useState(false);
  const [title, setTitle] = useState("");

  // --- Vazifalarni boshqarish funksiyalari ---

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      const newTask = {
        id: Date.now(),
        completed: false,
        title: trimmedTitle,
      };
      setTasks(reversed ? [newTask, ...tasks] : [...tasks, newTask]);
      setTitle("");
    } else {
      alert("Task sarlavhasi bo'sh bo'lishi mumkin emas!");
    }
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (!taskToEdit) return;

    const newTitle = prompt("Sarlavhani yangilang:", taskToEdit.title);

    if (newTitle !== null && newTitle.trim() !== "") {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle.trim() } : task
        )
      );
    } else if (newTitle !== null) {
      alert("Sarlavha bo'sh bo'lishi mumkin emas!");
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  // --- useEffect ---

  // Teskari qilish uchun useEffect
  useEffect(() => {
    setTasks((currentTasks) => [...currentTasks].reverse());
  }, [reversed]);

  const isAddButtonDisabled = title.trim() === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6">
            My Tasks
          </h1>

          {/* Input va Qo'shish qismi */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              className="flex-grow p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder="Add a new task..."
            />
            <button
              className={`px-6 py-3 rounded-lg text-white font-semibold transition duration-200 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isAddButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
              }`}
              onClick={handleAdd}
              disabled={isAddButtonDisabled}
            >
              Add Task
            </button>
          </div>

          {/* Reverse tugmasi */}
          {tasks.length > 0 && (
            <div className="text-right mb-4">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  reversed
                    ? "bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400"
                }`}
                onClick={() => setReversed((prevReversed) => !prevReversed)}
              >
                {reversed ? "Order: Reversed" : "Order: Normal"}
              </button>
            </div>
          )}

          {/* Vazifalar Ro'yxati */}
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-500 py-6 text-lg">
                No tasks yet. Add one above!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  className={`flex items-center justify-between p-4 rounded-lg shadow transition duration-300 ease-in-out ${
                    task.completed
                      ? "bg-green-50 border border-green-200 opacity-70"
                      : "bg-white border border-gray-200 hover:shadow-md"
                  }`}
                  key={task.id}
                >
                  <p
                    className={`flex-grow text-gray-800 mr-4 break-words ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </p>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!task.completed && (
                      <>
                        <button
                          className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 border border-green-600 rounded text-white shadow-sm transition duration-150"
                          onClick={() => handleToggleComplete(task.id)} // Toggle funksiyasini chaqiradi
                        >
                          Complete
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 border border-yellow-500 rounded text-white shadow-sm transition duration-150"
                          onClick={() => handleEdit(task.id)}
                        >
                          Edit
                        </button>
                      </>
                    )}

                    {task.completed && (
                      <button
                        className="px-3 py-1 text-sm bg-gray-500 hover:bg-gray-600 border border-gray-600 rounded text-white shadow-sm transition duration-150"
                        onClick={() => handleToggleComplete(task.id)} // Toggle funksiyasini chaqiradi
                      >
                        Undo
                      </button>
                    )}

                    <button
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 border border-red-600 rounded text-white shadow-sm transition duration-150"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
