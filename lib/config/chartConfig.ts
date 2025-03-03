export const chartColors = {
  primary: '#171717',
  secondary: '#404040',
  accent: '#0ea5e9',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  grid: '#e2e8f0',
  // Additional colors for multiple categories
  category1: '#3b82f6',
  category2: '#6366f1',
  category3: '#8b5cf6',
  category4: '#a855f7',
  category5: '#ec4899',
  // Transparent versions for backgrounds
  accentLight: '#0ea5e920',
  successLight: '#22c55e20',
  warningLight: '#f59e0b20',
};

export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        boxWidth: 12,
        padding: 15,
        font: {
          family: 'Inter',
          size: 12
        },
        color: '#171717'
      }
    },
    tooltip: {
      backgroundColor: '#171717',
      titleFont: {
        family: 'Inter',
        size: 12
      },
      bodyFont: {
        family: 'Inter',
        size: 11
      },
      padding: 12,
      cornerRadius: 4
    }
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        font: {
          family: 'Inter',
          size: 11
        },
        color: '#171717',
        maxRotation: 45
      }
    },
    y: {
      grid: {
        color: '#e2e8f0',
        drawBorder: false
      },
      ticks: {
        font: {
          family: 'Inter',
          size: 11
        },
        color: '#171717',
        padding: 8
      },
      beginAtZero: true
    }
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20
    }
  },
  elements: {
    line: {
      tension: 0.3
    },
    bar: {
      borderRadius: 4
    },
    point: {
      radius: 4,
      hoverRadius: 6
    }
  }
};

// Add this new configuration for pie/doughnut charts
export const pieChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            family: 'Inter',
            size: 12
          },
        color: '#171717'
      }
    },
    tooltip: {
      backgroundColor: '#171717',
      titleFont: {
        family: 'Inter',
        size: 12
      },
      bodyFont: {
        family: 'Inter',
        size: 11
      },
      padding: 12,
      cornerRadius: 4
    }
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20 // Extra padding for legend
    }
  },
  cutout: '60%' // For doughnut charts
};

// Specific options for stacked bar charts
export const stackedBarOptions = {
  ...commonChartOptions,
  scales: {
    ...commonChartOptions.scales,
    x: {
      ...commonChartOptions.scales.x,
      stacked: true
    },
    y: {
      ...commonChartOptions.scales.y,
      stacked: true
    }
  }
};