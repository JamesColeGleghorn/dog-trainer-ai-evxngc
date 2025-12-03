
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { colors } from "@/styles/commonStyles";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <IconSymbol 
              ios_icon_name="person.circle.fill" 
              android_material_icon_name="person" 
              size={80} 
              color={colors.primary} 
            />
          </View>
          <Text style={styles.name}>Dog Trainer</Text>
          <Text style={styles.email}>trainer@dogtraining.com</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <IconSymbol 
                ios_icon_name="lightbulb.fill" 
                android_material_icon_name="lightbulb" 
                size={24} 
                color={colors.accent} 
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>AI-Powered Guidance</Text>
                <Text style={styles.infoText}>
                  Get research-backed training advice tailored to your specific situation
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <IconSymbol 
                ios_icon_name="book.fill" 
                android_material_icon_name="book" 
                size={24} 
                color={colors.secondary} 
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Evidence-Based</Text>
                <Text style={styles.infoText}>
                  All recommendations are backed by scientific research and expert knowledge
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.infoRow}>
              <IconSymbol 
                ios_icon_name="chart.bar.fill" 
                android_material_icon_name="bar-chart" 
                size={24} 
                color={colors.highlight} 
              />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Track Progress</Text>
                <Text style={styles.infoText}>
                  Log your training sessions and monitor improvement over time
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          {[
            { icon: 'search', text: 'AI-powered search for training advice' },
            { icon: 'list', text: 'Training log to track sessions' },
            { icon: 'auto-awesome', text: 'Related questions and suggestions' },
            { icon: 'verified', text: 'Research-backed recommendations' }
          ].map((feature, index) => (
            <React.Fragment key={index}>
              <View style={styles.featureItem}>
                <IconSymbol 
                  ios_icon_name="checkmark.circle.fill" 
                  android_material_icon_name={feature.icon} 
                  size={20} 
                  color={colors.primary} 
                />
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            </React.Fragment>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This app provides general guidance. Always consult with a professional dog trainer for specific behavioral issues.
          </Text>
        </View>
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
    marginBottom: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.textSecondary + '40',
  },
  featureText: {
    fontSize: 15,
    color: colors.text,
    marginLeft: 12,
    flex: 1,
  },
  footer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.accent + '40',
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: 'center',
  },
});
