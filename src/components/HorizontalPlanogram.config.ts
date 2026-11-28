import type { GroupView } from '~/lib/planogram'

export function getGroupView(
  views: Record<string, GroupView>,
  groupId: string,
): GroupView {
  return views[groupId] ?? 'cards'
}

export function isGroupCollapsed(
  collapsedGroups: Set<string>,
  groupId: string,
) {
  return collapsedGroups.has(groupId)
}
