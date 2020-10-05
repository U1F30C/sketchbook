from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
from matplotlib.ticker import LinearLocator, FormatStrFormatter
import matplotlib.pyplot as plot
import numpy as np
import math

fig = plot.figure()
ax = fig.gca(projection='3d')

s = 0.05

# Sphere
# lim = 5.12
# X = np.arange(-lim, lim, s)
# Y = np.arange(-lim, lim, s)
# X, Y = np.meshgrid(X, Y)
# Z = (X)**2 + (Y)**2

# Rosenbrock
# lim = 2.048
# X = np.arange(-lim, lim, s)
# Y = np.arange(-lim, lim, s)
# X, Y = np.meshgrid(X, Y)
# Z = (1. - X)**2 + 100. * (Y - X * X)**2

# Rastrigin
# lim = 5.12
# X = np.arange(-lim, lim, s)
# Y = np.arange(-lim, lim, s)
# X, Y = np.meshgrid(X, Y)
# Z = 20 + X**2 - 10 * np.cos(2 * math.pi * X) + Y**2 - 10 * np.cos(
#     2 * math.pi * Y)

# Quartic
#lim = 1.28
#X = np.arange(-lim, lim, s)
#Y = np.arange(-lim, lim, s)
#X, Y = np.meshgrid(X, Y)
#Z = X**4 + 2 * Y**4

surf = ax.plot_surface(X,
                       Y,
                       Z,
                       rstride=1,
                       cstride=1,
                       cmap=cm.jet,
                       linewidth=0,
                       antialiased=False)  #Try coolwarm vs jet

ax.zaxis.set_major_locator(LinearLocator(10))
ax.zaxis.set_major_formatter(FormatStrFormatter('%.02f'))

fig.colorbar(surf, shrink=0.5, aspect=5)

plot.show()