export const nodeColorConfig = {
  customInput: {
    classes: 'border-green-500 hover:border-green-600 text-green-500',
    borderClass: 'border-green-500 shadow-green-100 dark:shadow-green-900/20 hover:border-green-600',
    gradientClass: 'bg-gradient-to-br from-green-100 to-green-500/10 dark:from-green-900/20 dark:to-green-500/5',
    handleColors: {
      source: 'from-green-400 to-green-600',
      target: 'from-green-300 to-green-500'
    }
  },
  llm: {
    classes: 'border-red-500 hover:border-red-600 text-red-600',
    borderClass: 'border-red-500 shadow-red-100 dark:shadow-red-900/20 hover:border-red-600',
    gradientClass: 'bg-gradient-to-br from-red-50 to-red-600/10 dark:from-red-900/20 dark:to-red-600/5',
    handleColors: {
      source: 'from-purple-400 to-purple-600',
      target: 'from-red-400 to-red-600'
    }
  },
  customOutput: {
    classes: 'border-purple-500 hover:border-purple-600 text-purple-500',
    borderClass: 'border-purple-500 shadow-purple-100 dark:shadow-purple-900/20 hover:border-purple-600',
    gradientClass: 'bg-gradient-to-br from-purple-100 to-purple-500/10 dark:from-purple-900/20 dark:to-purple-500/5',
    handleColors: {
      source: 'from-purple-400 to-purple-600',
      target: 'from-red-400 to-red-600'
    }
  },
  text: {
    classes: 'border-gray-500 hover:border-gray-600 text-gray-500',
    borderClass: 'border-gray-500 shadow-gray-100 dark:shadow-gray-900/20 hover:border-gray-600',
    gradientClass: 'bg-gradient-to-br from-gray-100 to-gray-500/10 dark:from-gray-900/20 dark:to-gray-500/5',
    handleColors: {
      source: 'from-gray-400 to-gray-600',
      target: 'from-gray-400 to-gray-600'
    }
  },
  apiCall: {
    classes: 'border-orange-500 hover:border-orange-600 text-orange-500',
    borderClass: 'border-orange-500 shadow-orange-100 dark:shadow-orange-900/20 hover:border-orange-600',
    gradientClass: 'bg-gradient-to-br from-orange-100 to-orange-500/10 dark:from-orange-900/20 dark:to-orange-500/5',
    handleColors: {
      source: 'from-orange-400 to-orange-600',
      target: 'from-cyan-400 to-cyan-600'
    }
  },
  dataTransform: {
    classes: 'border-yellow-500 hover:border-yellow-600 text-yellow-500',
    borderClass: 'border-yellow-500 shadow-yellow-100 dark:shadow-yellow-900/20 hover:border-yellow-600',
    gradientClass: 'bg-gradient-to-br from-yellow-100 to-yellow-500/10 dark:from-yellow-900/20 dark:to-yellow-500/5',
    handleColors: {
      source: 'from-emerald-400 to-emerald-600',
      target: 'from-yellow-400 to-yellow-600'
    }
  },
};

export const getNodeColorClasses = (type) => {
  return nodeColorConfig[type]?.classes || nodeColorConfig.text.classes;
};

export const getNodeBorderClass = (type) => {
  return nodeColorConfig[type]?.borderClass || nodeColorConfig.text.borderClass;
};

export const getNodeGradientClass = (type) => {
  return nodeColorConfig[type]?.gradientClass || nodeColorConfig.text.gradientClass;
};


export const getHandleColorClasses = (nodeType, handleType) => {
  const config = nodeColorConfig[nodeType] || nodeColorConfig.text;
  return config.handleColors[handleType] || config.handleColors.source;
};
