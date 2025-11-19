import { ref, onMounted, onUnmounted } from 'vue';

export function useCPUMonitor() {
  const cpuUsage = ref(0); // Uso da CPU em porcentagem
  let lastStartTime = performance.now(); // Tempo inicial
  let totalBusyTime = 0; // Tempo total gasto em tarefas
  let totalTime = 0; // Tempo total decorrido
  let observer: PerformanceObserver;

  // Função para calcular o uso da CPU
  const calculateCPUUsage = () => {
    const now = performance.now();
    totalTime = now - lastStartTime; // Tempo total decorrido desde a última medição

    if (totalTime > 0) {
      cpuUsage.value = parseFloat(((totalBusyTime / totalTime) * 100).toFixed(2)); // Uso da CPU em porcentagem
    }

    // Reinicia os contadores para o próximo ciclo
    totalBusyTime = 0;
    lastStartTime = now;
  };

  // Inicia o monitoramento
  const startMonitoring = () => {
    observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'longtask') {
          totalBusyTime += entry.duration; // Soma o tempo gasto em tarefas
        }
      });
    });

    // Observa tarefas (tasks) e tarefas longas (longtasks)
    observer.observe({ entryTypes: ['longtask'] });

    // Atualiza o uso da CPU a cada segundo
    setInterval(calculateCPUUsage, 100);
  };

  // Para o monitoramento
  const stopMonitoring = () => {
    if (observer) {
      observer.disconnect();
    }
  };

  onMounted(() => {
    startMonitoring();
  });

  onUnmounted(() => {
    stopMonitoring();
  });

  return {
    cpuUsage,
  };
}