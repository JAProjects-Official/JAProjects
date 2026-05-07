'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  Plus,
  RefreshCcw,
  Sparkles,
  Trash2,
} from 'lucide-react'

interface TodoItem {
  id: string
  title: string
  completed: boolean
}

type ToastState = {
  message: string
  type: 'success' | 'warning'
} | null

const STORAGE_KEY = 'todolist-v1'

export default function TodoListPage() {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [draft, setDraft] = useState('')
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      return
    }

    try {
      const parsed = JSON.parse(stored) as TodoItem[]
      setTodos(Array.isArray(parsed) ? parsed : [])
    } catch {
      setTodos([])
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    if (!toast) {
      return
    }

    const timeout = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const pendingCount = useMemo(
    () => todos.filter((todo) => !todo.completed).length,
    [todos],
  )

  const completedCount = useMemo(
    () => todos.filter((todo) => todo.completed).length,
    [todos],
  )

  const totalCount = todos.length

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = draft.trim()

    if (!value) {
      setToast({ message: 'Escribe una tarea antes de añadirla.', type: 'warning' })
      return
    }

    setTodos((current) => [
      ...current,
      {
        id: crypto.randomUUID?.() ?? String(Date.now()),
        title: value,
        completed: false,
      },
    ])
    setDraft('')
    setToast({ message: 'Tarea añadida con éxito.', type: 'success' })
  }

  const toggleTask = (id: string) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const removeTask = (id: string) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
    setToast({ message: 'Tarea eliminada.', type: 'success' })
  }

  const clearCompleted = () => {
    if (!completedCount) {
      setToast({ message: 'No hay tareas completadas para limpiar.', type: 'warning' })
      return
    }

    setTodos((current) => current.filter((todo) => !todo.completed))
    setToast({ message: 'Tareas completadas eliminadas.', type: 'success' })
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card/90 p-6 shadow-2xl shadow-black/5 backdrop-blur-xl dark:bg-card dark:bg-opacity-85">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm shadow-primary/5 dark:border-primary/30 dark:bg-primary/10">
                <Sparkles className="h-4 w-4" />
                Todo List
              </div>
              <div>
                <h1 className="text-3xl font-semibold sm:text-4xl">Organiza tu día con estilo</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                  Lista de tareas moderna para tu portfolio. Añade, completa y elimina tareas con persistencia local y una experiencia móvil/tablet/desktop fluida.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:auto-cols-max sm:grid-flow-col">
              <button
                type="button"
                onClick={clearCompleted}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border bg-secondary/60 px-4 py-3 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/60 hover:bg-secondary/75 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
              >
                <RefreshCcw className="h-4 w-4" />
                Limpiar completadas
              </button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="rounded-[1.75rem] border border-border bg-background/80 p-5 shadow-sm shadow-black/5 dark:bg-background/90">
              <form onSubmit={addTask} className="grid gap-4">
                <label htmlFor="todo-input" className="sr-only">
                  Añadir nueva tarea
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="todo-input"
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder="Escribe tu próxima tarea"
                    className="min-h-[3rem] flex-1 rounded-2xl border border-border bg-input/80 px-4 text-sm text-foreground outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/15 dark:bg-input/95"
                    aria-describedby="todo-helper"
                  />
                  <button
                    type="submit"
                    className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60"
                  >
                    <Plus className="h-4 w-4" />
                    Añadir tarea
                  </button>
                </div>
                <p id="todo-helper" className="text-xs text-muted-foreground">
                  Presiona Enter o usa el botón para guardar tu tarea. El estado se mantiene en tu navegador.
                </p>
              </form>

              <div className="mt-6 rounded-[1.5rem] border border-border bg-card p-4 shadow-sm shadow-black/5 dark:bg-card/90">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Tareas pendientes</p>
                    <p className="text-2xl font-semibold">{pendingCount} / {totalCount}</p>
                  </div>
                  <div className="rounded-2xl bg-primary/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:bg-primary/10">
                    {completedCount} completadas
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-border bg-card p-4 shadow-sm shadow-black/5 dark:bg-card/90">
                {todos.length === 0 ? (
                  <div className="flex min-h-[14rem] flex-col items-center justify-center gap-4 rounded-[1.5rem] border border-dashed border-border/60 bg-secondary/5 p-8 text-center text-muted-foreground dark:bg-secondary/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">Aún no hay tareas</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Añade tu primera tarea y comienza a organizar tu jornada de forma más clara.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-h-[32rem] space-y-3 overflow-y-auto pr-1">
                    {todos.map((todo) => (
                      <article
                        key={todo.id}
                        className="group flex items-center justify-between gap-4 rounded-[1.5rem] border border-border/80 bg-background/90 px-4 py-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10 dark:bg-background/95"
                      >
                        <button
                          type="button"
                          onClick={() => toggleTask(todo.id)}
                          className="flex min-w-0 flex-1 items-center gap-4 text-left"
                          aria-pressed={todo.completed}
                        >
                          <span
                            className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition duration-200 ${
                              todo.completed
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border/80 bg-background text-muted-foreground dark:bg-background/95'
                            }`}
                          >
                            {todo.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                          </span>
                          <span
                            className={`min-w-0 break-words text-sm font-medium transition ${
                              todo.completed
                                ? 'text-muted-foreground line-through decoration-primary/50'
                                : 'text-foreground'
                            }`}
                          >
                            {todo.title}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeTask(todo.id)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border/80 bg-secondary/50 text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/30"
                          aria-label={`Eliminar tarea ${todo.title}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="rounded-[1.75rem] border border-border bg-secondary/5 p-6 shadow-sm shadow-black/5 dark:bg-secondary/10">
              <div className="space-y-5">
                <div className="rounded-3xl bg-card p-5 shadow-sm shadow-black/5 dark:bg-card/95">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Consejos rápidos
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                      Presiona <span className="rounded-full bg-background px-2 py-0.5 text-xs text-muted-foreground shadow-sm">Enter</span> para añadir tareas rápidamente.
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                      Marca tareas para ver el progreso y limpiar completadas al final del día.
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 text-primary" />
                      Si la lista está vacía, utiliza el espacio para planificar tu siguiente sprint.
                    </li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-border bg-card p-5 shadow-sm shadow-black/5 dark:bg-card/95">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Estado actual
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-background/90 p-4 text-center">
                      <p className="text-3xl font-semibold text-foreground">{totalCount}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tareas totales</p>
                    </div>
                    <div className="rounded-3xl bg-background/90 p-4 text-center">
                      <p className="text-3xl font-semibold text-foreground">{pendingCount}</p>
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pendientes</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>


      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-3xl border px-5 py-4 shadow-2xl shadow-black/10 transition duration-200 ${
            toast.type === 'success'
              ? 'border-green-300 bg-emerald-50 text-emerald-900 dark:border-emerald-400 dark:bg-emerald-950 dark:text-emerald-300'
              : 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-400 dark:bg-amber-950 dark:text-amber-200'
          }`}
        >
          <div className="flex items-center gap-3 text-sm font-medium">
            <AlertTriangle className="h-4 w-4" />
            {toast.message}
          </div>
        </div>
      ) : null}
    </main>
  )
}
