import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';

interface Item {
  label: string;
  value: string;
}

const DropDown: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Orange', value: 'orange' },
  ]);
  
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Filter items based on search
    if (search === '') {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.label.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search, items]);

  const addItem = () => {
    if (search.trim() && !items.some(item => item.label.toLowerCase() === search.toLowerCase())) {
      const newItem = { label: search, value: search.toLowerCase() };
      setItems(prevItems => [...prevItems, newItem]);
      setSelectedValue(newItem.value);
      setSearch('');
      setDropdownVisible(false);  // Close dropdown after adding
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = (item: Item) => {
    setSelectedValue(item.value);
    setSearch('');
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownToggle} onPress={toggleDropdown}>
        <Text style={styles.dropdownText}>
          {selectedValue ? items.find(item => item.value === selectedValue)?.label : 'Select an item'}
        </Text>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      {dropdownVisible && (
        <Modal transparent={true} animationType="fade">
          <View style={styles.modalBackground}>
            <View style={styles.dropdownContainer}>
              {/* Search Box */}
              <TextInput
                style={styles.input}
                placeholder="Search or Add Item"
                value={search}
                onChangeText={setSearch}
              />

              {/* List of Filtered Items */}
              <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.item} onPress={() => selectItem(item)}>
                    <Text style={styles.itemText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />

              {/* Add Item Button if Search Query is New */}
              {search.trim() && !filteredItems.some(item => item.label.toLowerCase() === search.toLowerCase()) && (
                <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
                  <Text style={styles.addItemText}>Add "{search}"</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </Modal>
      )}

      <Text style={styles.selectedItem}>Selected Value: {selectedValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  dropdownToggle: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdownText: {
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  dropdownContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    maxHeight: 300,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  addItemButton: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  addItemText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  selectedItem: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default DropDown;
