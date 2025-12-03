
import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  ActivityIndicator,
  Platform
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/commonStyles";
import { IconSymbol } from "@/components/IconSymbol";

interface AIResponse {
  answer: string;
  sources: string[];
  suggestions: string[];
}

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      console.log('Empty query, skipping search');
      return;
    }

    setLoading(true);
    console.log('Searching for:', query);

    // Simulate AI response - In production, this would call an AI API
    setTimeout(() => {
      const mockResponse: AIResponse = {
        answer: `For a 5-month-old puppy that loves to sniff on walks, here are evidence-based recommendations:\n\n1. **Scent Work Games**: Use the puppy's natural sniffing instinct as mental stimulation. Hide treats around your home or yard and let them search. This tires them mentally, which is often more effective than physical exercise.\n\n2. **Structured Sniffing Walks**: Instead of fighting the sniffing, embrace it! Allow dedicated "sniff time" during walks. Research shows that 15 minutes of sniffing can be as tiring as a 30-minute walk.\n\n3. **Puzzle Feeders**: Use food-dispensing toys and puzzle feeders for meals. This engages their problem-solving skills and satisfies their foraging instincts.\n\n4. **Training Sessions**: Short, frequent training sessions (5-10 minutes) are mentally exhausting for puppies. Teach new commands or tricks.\n\n5. **Socialization**: Controlled exposure to new environments, people, and dogs provides mental stimulation while building confidence.`,
        sources: [
          "Journal of Veterinary Behavior - Canine Enrichment Study (2021)",
          "American Kennel Club - Puppy Development Guidelines",
          "Applied Animal Behaviour Science - Olfactory Stimulation in Dogs"
        ],
        suggestions: [
          "How to teach scent work to puppies",
          "Best puzzle toys for 5-month-old puppies",
          "Balancing physical and mental exercise for puppies",
          "Socialization timeline for puppies"
        ]
      };

      setResponse(mockResponse);
      setLoading(false);
      console.log('Search completed');
    }, 1500);
  };

  const handleSuggestionPress = (suggestion: string) => {
    console.log('Suggestion pressed:', suggestion);
    setQuery(suggestion);
    setResponse(null);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <IconSymbol 
            ios_icon_name="pawprint.fill" 
            android_material_icon_name="pets" 
            size={48} 
            color={colors.primary} 
          />
          <Text style={styles.title}>Dog Training Assistant</Text>
          <Text style={styles.subtitle}>
            AI-powered guidance backed by research
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputWrapper}>
            <IconSymbol 
              ios_icon_name="magnifyingglass" 
              android_material_icon_name="search" 
              size={20} 
              color={colors.textSecondary} 
            />
            <TextInput
              style={styles.input}
              placeholder="Ask about dog training..."
              placeholderTextColor={colors.textSecondary}
              value={query}
              onChangeText={setQuery}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity 
            style={[styles.searchButton, loading && styles.searchButtonDisabled]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.card} />
            ) : (
              <Text style={styles.searchButtonText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>

        {response && (
          <View style={styles.responseContainer}>
            <View style={styles.answerCard}>
              <View style={styles.cardHeader}>
                <IconSymbol 
                  ios_icon_name="lightbulb.fill" 
                  android_material_icon_name="lightbulb" 
                  size={24} 
                  color={colors.accent} 
                />
                <Text style={styles.cardTitle}>AI Recommendation</Text>
              </View>
              <Text style={styles.answerText}>{response.answer}</Text>
            </View>

            <View style={styles.sourcesCard}>
              <View style={styles.cardHeader}>
                <IconSymbol 
                  ios_icon_name="book.fill" 
                  android_material_icon_name="book" 
                  size={24} 
                  color={colors.secondary} 
                />
                <Text style={styles.cardTitle}>Research Sources</Text>
              </View>
              {response.sources.map((source, index) => (
                <React.Fragment key={index}>
                  <View style={styles.sourceItem}>
                    <Text style={styles.sourceBullet}>•</Text>
                    <Text style={styles.sourceText}>{source}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>

            <View style={styles.suggestionsCard}>
              <View style={styles.cardHeader}>
                <IconSymbol 
                  ios_icon_name="sparkles" 
                  android_material_icon_name="auto-awesome" 
                  size={24} 
                  color={colors.primary} 
                />
                <Text style={styles.cardTitle}>Related Questions</Text>
              </View>
              {response.suggestions.map((suggestion, index) => (
                <React.Fragment key={index}>
                  <TouchableOpacity 
                    style={styles.suggestionItem}
                    onPress={() => handleSuggestionPress(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                    <IconSymbol 
                      ios_icon_name="arrow.right" 
                      android_material_icon_name="arrow-forward" 
                      size={16} 
                      color={colors.primary} 
                    />
                  </TouchableOpacity>
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {!response && !loading && (
          <View style={styles.examplesContainer}>
            <Text style={styles.examplesTitle}>Example Questions:</Text>
            {[
              "How to stop puppy biting?",
              "Best way to crate train a dog?",
              "My dog pulls on the leash, what should I do?",
              "How to teach a dog to stay?"
            ].map((example, index) => (
              <React.Fragment key={index}>
                <TouchableOpacity 
                  style={styles.exampleItem}
                  onPress={() => {
                    setQuery(example);
                    console.log('Example selected:', example);
                  }}
                >
                  <Text style={styles.exampleText}>{example}</Text>
                </TouchableOpacity>
              </React.Fragment>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? 48 : 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
    minHeight: 60,
  },
  searchButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(100, 149, 237, 0.3)',
    elevation: 3,
  },
  searchButtonDisabled: {
    opacity: 0.6,
  },
  searchButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '600',
  },
  responseContainer: {
    gap: 16,
  },
  answerCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.accent + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  sourcesCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.secondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  suggestionsCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.primary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  answerText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  sourceItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  sourceBullet: {
    fontSize: 16,
    color: colors.secondary,
    marginRight: 8,
  },
  sourceText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
  },
  examplesContainer: {
    marginTop: 20,
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  exampleItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  exampleText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '500',
  },
});
