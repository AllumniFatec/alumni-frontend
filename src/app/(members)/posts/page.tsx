import { Section } from "@/components/Section";
import { PostCard } from "@/components/Posts";
import { mockPosts } from "@/mocks";

export default function PostsPage() {
  return (
    <div>
      <Section title="Publicações da Rede">
        <div className="flex flex-col gap-4">
          {mockPosts.map((post) => (
            <PostCard key={post.post_id} post={post} />
          ))}
        </div>
      </Section>
    </div>
  );
}
