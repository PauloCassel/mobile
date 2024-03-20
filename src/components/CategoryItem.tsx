import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Category } from '../types/Task';

interface CategoryItemProps {
  item: Category;
  handleSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryItem = ({item, handleSelectCategory}: CategoryItemProps) => {
    return (
        <TouchableOpacity onPress={() => handleSelectCategory(item.value)} style={styles.container}>
            <Text>{item.id}</Text>
            <Text>{item.label}</Text>
            <Text>{item.value}</Text>
            <Text>{item.color}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {

    },
});

export default CategoryItem;