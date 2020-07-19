#include <bits/stdc++.h>

#include <sstream>
#include <string>

using namespace std;

template <class T>
class Graph {
 private:
  class Node;
  class Edge;

  class Node {
   public:
    T data;
    list<Edge> edges;
    double key;
    string route;
    Node(T d) : data(d), key(0) {}
    Edge& findEdge(T data) {
      return *find_if(edges.begin(), edges.end(),
                      [=](Edge& edge) { return edge.data == data; });
    }
    bool existsEdge(T data) {
      for (auto const& i : edges) {
        if (i.destination.data == data) return true;
      }
      return false;
    }
  };

  class Edge {
   public:
    Node& destination;
    int weight;
    Edge(Node& n, int w) : destination(n), weight(w) {}
    Edge& operator=(Edge const&) { return *this; }
  };

  list<Node> nodes;
  bool isDirected;
  Node& findNode(T data);
  Node& privateAddNode(T data);

 public:
  Graph(bool iD);
  ~Graph();
  void addEdge(T source, T destination, int weight);
  void addNode(T data);
  bool existsNode(T data);
  bool existsEdge(T source, T destination);

  void removeNode(T data);
  void removeEdge(T source, T destination);

  string toString();
  string dijkstra(T source);

  string showSingleFNode(T data) {
    stringstream output;
    if (!existsNode(data)) return "No existe";
    Node& n = findNode(data);
    output << (n).data << "";
    for (auto e = (n).edges.begin(); e != (n).edges.end(); e++) {
      output << " (" << (*e).weight << ")->" << (*e).destination.data;
    }
    output << "\n";
    return output.str();
  }
};

template <class T>
Graph<T>::Graph(bool iD) : isDirected(iD) {}

template <class T>
Graph<T>::~Graph() {}

template <class T>
typename Graph<T>::Node& Graph<T>::privateAddNode(T data) {
  Node tmpNode(data);
  nodes.push_back(tmpNode);
  return nodes.back();
}

template <class T>
void Graph<T>::addEdge(T source, T destination, int weight) {
  Node& sourceNode =
      existsNode(source) ? findNode(source) : privateAddNode(source);
  Node& destinationNode = existsNode(destination) ? findNode(destination)
                                                  : privateAddNode(destination);

  if (!sourceNode.existsEdge(destination)) {
    Edge tmpEgde(destinationNode, weight);
    sourceNode.edges.push_back(tmpEgde);
  }
  if (!isDirected && !destinationNode.existsEdge(source)) {
    Edge tmpEgde(sourceNode, weight);
    destinationNode.edges.push_back(tmpEgde);
  }
}

template <class T>
void Graph<T>::addNode(T data) {
  if (!existsNode(data)) privateAddNode(data);
}

template <class T>
bool Graph<T>::existsNode(T data) {
  for (auto const& i : nodes) {
    if (i.data == data) return true;
  }
  return false;
}

template <class T>
bool Graph<T>::existsEdge(T source, T destination) {
  Node& tmpNode = findNode(source);
  if (existsNode(source) && existsNode(destination)) {
    for (auto const& i : tmpNode.edges) {
      if (i.destination.data == destination) return true;
    }
    return false;
  } else
    return false;
}

template <class T>
typename Graph<T>::Node& Graph<T>::findNode(T data) {
  return *find_if(nodes.begin(), nodes.end(),
                  [=](Node& node) { return node.data == data; });
}

template <class T>
string Graph<T>::toString() {
  stringstream output;
  for (auto const& n : nodes) {
    output << (n).data << "";
    for (auto e = (n).edges.begin(); e != (n).edges.end(); e++) {
      output << " (" << (*e).weight << ")->" << (*e).destination.data;
    }
    output << "\n";
  }
  return output.str();
}

template <class T>
void Graph<T>::removeNode(T data) {
  for (auto&& n : nodes)
    n.edges.remove_if(
        [=](Edge& edge) { return edge.destination.data == data; });
  nodes.remove_if([=](Node& node) { return node.data == data; });
}

template <class T>
void Graph<T>::removeEdge(T source, T destination) {
  for (auto&& n : nodes)
    if (n.data == source)
      n.edges.remove_if(
          [=](Edge& edge) { return edge.destination.data == destination; });
  if (!isDirected)
    for (auto&& n : nodes)
      if (n.data == destination)
        n.edges.remove_if(
            [=](Edge& edge) { return edge.destination.data == source; });
}

template <class T>
string Graph<T>::dijkstra(T source) {
  stringstream output;
  auto cmp = [](Node& a, Node& b) { return a.key > b.key; };
  priority_queue<reference_wrapper<Node>, deque<reference_wrapper<Node>>,
                 decltype(cmp)>
      unvisited(cmp);
  for (auto&& i : nodes) {
    unvisited.push(i);
    i.key = numeric_limits<double>::infinity();
    i.route = "";
  }
  Node& sourceNode = findNode(source);
  sourceNode.key = 0;
  sourceNode.route = sourceNode.data;

  while (!unvisited.empty()) {
    Node& currentNode = unvisited.top();
    for (auto& edge : currentNode.edges) {
      if (currentNode.key + edge.weight < edge.destination.key) {
        edge.destination.key = currentNode.key + edge.weight;
        edge.destination.route =
            currentNode.route + " ->" + edge.destination.data;
      }
    }
    unvisited.pop();
  }
  for (auto& i : nodes) {
    output << i.route << " = " << i.key << "\n";
  }
  return output.str();
}